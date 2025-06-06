import { Pipe, PipeTransform } from "@angular/core";
import { formatDistanceToNow } from "date-fns";

@Pipe({
  name: 'formatTimeAgo',
  standalone: true,
})
export class FormatTimeAgoPipe implements PipeTransform {
  transform(date: Date): string {
    return formatDistanceToNow(date, { addSuffix: true });
  }
}
