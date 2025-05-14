import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../../components/card/card.component';
import { NgFor } from '@angular/common';
import { Skill } from '../../models';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CardComponent, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  skills: Skill[] = [
    {
      icon: 'bi-code-square',
      title: 'Front-end',
      skills: 'HTML5, CSS3, JavaScript, Angular, Bootstrap, React Native, React, Next.js, Tailwind CSS'
    },
    {
      icon: 'bi-server',
      title: 'Back-end',
      skills: 'Node.js, Express, Firebase'
    },
    {
      icon: 'bi-tools',
      title: 'Outils',
      skills: 'Git, VS Code, Postman, Docker'
    }
  ];
}
