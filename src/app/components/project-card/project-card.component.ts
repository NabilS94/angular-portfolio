import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../models';


@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {
  @Input() project!: Project;
  @Input() imageLoading: boolean = false;
  @Output() imageLoaded = new EventEmitter<string>();
  @Output() projectClick = new EventEmitter<Project>();

  onImageLoad(): void {
    this.imageLoaded.emit(this.project.title);
  }

  onCardClick(): void {
    this.projectClick.emit(this.project);
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
} 