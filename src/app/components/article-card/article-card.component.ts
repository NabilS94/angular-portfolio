import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Author } from '../../models';


@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {
  @Input() id: string = '';
  @Input() title: string = '';
  @Input() summary: string = '';
  @Input() image: string = '';
  @Input() category: string = '';
  @Input() readTime: number = 0;
  @Input() author: Author = { name: '', avatar: '' };

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/placeholder.jpg'; // You can set a default image
  }
} 