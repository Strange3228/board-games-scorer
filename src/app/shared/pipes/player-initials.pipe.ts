import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'playerInitials',
  standalone: true,
})
export class PlayerInitialsPipe implements PipeTransform {
  transform(playerName: string): any {
    if (playerName.length === 0) return 'NP';

    const parts = playerName.trim().split(' ').filter(Boolean);
    const first = parts[0]?.[0] ?? '';
    const second = parts[1]?.[0] ?? parts[0]?.[1] ?? '';

    return (first + second).toUpperCase();
  }
}
