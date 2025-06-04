import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesStoreService, Game } from '../../../../shared/store/games.store';
import { format } from 'date-fns';
import { NavController } from '@ionic/angular';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss'],
  standalone: false,
})
export class GameDetailsComponent implements OnInit {
  game?: Game;
  loading = true;
  gridApi!: GridApi;
  columnDefs: ColDef[] = [];
  rowData: any[] = [];
  defaultColDef: ColDef = {
    sortable: false,
    resizable: false,
    filter: false,
    width: 100,
    suppressMovable: true,
    headerStyle: { textAlign: 'center' }
  };

  constructor(
    private route: ActivatedRoute,
    private gamesStore: GamesStoreService,
    private navCtrl: NavController,
    private router: Router
  ) {}

  async ngOnInit() {
    const gameId = this.route.snapshot.paramMap.get('id');
    if (gameId) {
      this.game = await this.gamesStore.getGameById(gameId);
      if (this.game) {
        this.setupGridData();
      }
    }
    this.loading = false;
  }

  private setupGridData() {
    if (!this.game) return;

    // Setup columns - Players as columns
    this.columnDefs = [
      {
        field: 'pointType',
        headerName: 'Points',
        pinned: 'left',
        width: 100,
        suppressSizeToFit: true,
        cellStyle: { fontWeight: '500' },
        headerStyle: { textAlign: 'center' }
      },
      ...this.game.players.map(player => ({
        field: player.player.id,
        headerName: player.player.name.split(' ')[0],
        width: 100,
        cellStyle: { textAlign: 'center' },
        headerStyle: { textAlign: 'center' }
      }))
    ];

    // Setup row data - Points as rows
    this.rowData = this.game.template.pointTypes.map(pointType => {
      const row: any = {
        pointType: pointType.name
      };

      // Add points for each player
      this.game!.players.forEach(player => {
        row[player.player.id] = player.score.points?.[pointType.id] || 0;
      });

      return row;
    });

    // Add total row
    const totalRow: any = {
      pointType: 'Total'
    };

    this.game.players.forEach(player => {
      totalRow[player.player.id] = this.getTotalPoints(player.player.id);
    });

    this.rowData.push(totalRow);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  hasWinner(): boolean {
    return !!this.game?.winner;
  }

  getWinnerName(): string {
    if (!this.game?.winner) return 'No winner';

    // Use type guard to ensure game is defined
    const game = this.game;
    if (!game) return 'Unknown';

    const winner = game.players.find(p => p.player.id === game.winner?.playerId);
    return winner ? winner.player.name : 'Unknown';
  }

  getTotalPoints(playerId: string): number {
    if (!this.game) return 0;
    const playerScore = this.game.players.find(p => p.player.id === playerId)?.score?.points;
    if (!playerScore) return 0;
    return Object.values(playerScore).reduce((sum, points) => sum + points, 0);
  }

  formatDate(date: Date): string {
    return format(new Date(date), 'MMMM dd, yyyy HH:mm');
  }

  goBack(event?: any): void {
    if (event) {
      event.preventDefault();
    }
    this.router.navigate(['/tabs/history']);
  }
}
