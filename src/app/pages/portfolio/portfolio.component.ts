import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { ProjectModalComponent } from '../../components/project-modal/project-modal.component';
import { Project } from '../../models';


interface Filter {
  id: string;
  label: string;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ProjectCardComponent, ProjectModalComponent],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {
  projects: Project[] = [
    {
      title: 'Crypto Tracker',
      description: "Application Next.js pour suivre les tendances et prix des cryptomonnaies via l'API CoinCap, avec graphiques interactifs, tableaux des cryptos populaires et marchés d'échange.",
      longDescription: "Une application Next.js qui permet aux utilisateurs de consulter les tendances des prix des cryptomonnaies, les prix actuels et d'autres informations pertinentes en utilisant l'API CoinCap.L'application inclut des graphiques interactifs, un tableau des cryptomonnaies populaires, des périodes personnalisables pour l'historique des prix, ainsi qu'un tableau des marchés d'échange des cryptomonnaies populaires.",
      image: 'assets/images/projects/crypto.png',
      demoUrl: 'https://crypto-viewer-phi-three.vercel.app/',
      githubUrl: 'https://github.com/NabilS94/crypto-viewer',
      technologies: ['NextJs', 'ChartJs', 'CoinCap API'],
      category: 'web',
      features: [
        'Graphiques interactifs',
        'Tableaux des cryptos populaires',
        'Périodes personnalisables pour l\'historique des prix',
        'Tableau des marchés d\'échange des cryptomonnaies populaires'
      ],
      challenges: [
        'Optimisation des performances pour le chargement des images',
        'Mise en place d\'un système de cache efficace',
        'Gestion des transactions concurrentes'
      ]
    },
    {
      title: 'Application Mobile de Fitness',
      description: 'Application mobile pour suivre les entraînements et la nutrition.',
      longDescription: 'Une application mobile de fitness développée avec React Native. Elle permet aux utilisateurs de suivre leurs entraînements, de planifier leurs repas et de suivre leur progression.',
      image: 'assets/images/projects/fitness-app.png',
      demoUrl: 'https://demo-fitness.com',
      githubUrl: 'https://github.com/username/fitness-app',
      technologies: ['React Native', 'Firebase'],
      category: 'mobile',
      features: [
        'Suivi des entraînements personnalisés',
        'Planification des repas et calcul des calories',
        'Suivi de la progression avec graphiques',
        'Synchronisation avec les appareils de fitness'
      ],
      challenges: [
        'Optimisation de la batterie',
        'Gestion du stockage local',
        'Synchronisation en temps réel'
      ]
    },
    {
      title: 'Dashboard Analytics',
      description: 'Tableau de bord interactif pour visualiser des données en temps réel.',
      longDescription: 'Un tableau de bord analytique développé avec Angular et D3.js. Il permet de visualiser et d\'analyser des données en temps réel avec des graphiques interactifs.',
      image: 'assets/images/projects/dashboard.webp',
      demoUrl: 'https://demo-dashboard.com',
      githubUrl: 'https://github.com/username/dashboard',
      technologies: ['Angular', 'D3.js', 'Express'],
      category: 'design',
      features: [
        'Visualisation de données en temps réel',
        'Graphiques interactifs et personnalisables',
        'Export de rapports en PDF et Excel',
        'Filtres avancés et recherche'
      ],
      challenges: [
        'Gestion des grandes quantités de données',
        'Optimisation des performances des graphiques',
        'Mise en place d\'un système de cache efficace'
      ]
    }
  ];

  filteredProjects: Project[] = this.projects;
  currentFilter: string = 'all';
  selectedProject: Project | null = null;
  sortBy: string = 'newest';
  imageLoading: { [key: string]: boolean } = {};

  filters: Filter[] = [
    { id: 'all', label: 'Tous' },
    { id: 'web', label: 'Web' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'design', label: 'Design' }
  ];

  filterProjects(filter: string): void {
    this.currentFilter = filter;
    this.filteredProjects = filter === 'all' 
      ? this.projects 
      : this.projects.filter(project => project.category === filter);
    this.sortProjects(this.sortBy);
  }

  sortProjects(sortBy: string): void {
    this.sortBy = sortBy;
    switch (sortBy) {
      case 'newest':
        this.filteredProjects.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'oldest':
        this.filteredProjects.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name':
        this.filteredProjects.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
  }

  openProjectDetails(project: Project): void {
    this.selectedProject = project;
  }

  closeProjectDetails(): void {
    this.selectedProject = null;
  }

  onImageLoad(projectTitle: string): void {
    this.imageLoading[projectTitle] = true;
  }
}
