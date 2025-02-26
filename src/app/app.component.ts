import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

interface PersonnalityData {
  number: number;
  title:string;
  description:string;
}

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'personnality-diver';

  nameInput:FormControl=new FormControl('');

  personnality:PersonnalityData |null = null;

  get activeNumber(){
    return this.calculateActiveNumber(this.nameInput.value);
  }

  activeNumberData: PersonnalityData[] = [
    {
      number: 1,
      title: 'Force et loyauté',
      description: 'Un main de main de fer dans un gant de velours... Votre forte personnalité vous dessert parfois, mais vous refusez de la nuancer, par crainte de vous compromettre. Vous avez le mérite de jouer cartes sur table et d\'agir en toute loyauté. Sur le plan sentimental vous exprimez spontanément vos sentiments. En professionnel, vos collègues vous jugent opportuniste. Vos talents créatifs vous orientent vers des activités artistiques ou entrepreneuriales.'
    },
    {
      number: 2,
      title: 'Une sensibilité à fleur de peau',
      description: 'Vous possédez un sens relationnel prononcé et une forte émotivité. Vous aimez le contact mais votre sensibilité vous joue des tours. Vous excellez dans les secteurs liés à la communication. Côté cœur, vous recherchez une personne capable de vous comprendre et de vous protéger. Le mariage est pour vous une notion sacrée.'
    },
    {
      number: 3,
      title: 'L\'imagination au pouvoir',
      description: 'Original sans être excentrique, vous êtes guidé par votre intuition. Vous possédez des dons artistiques évidents. Pragmatique en affaires comme en amour, vous trouvez des solutions immédiates aux problèmes. Vous avez besoin d\'une reconnaissance plus morale que financière. Attiré par des expériences insolites, vous testez vos partenaires avant de vous engager.'
    },
    {
      number: 4,
      title: 'De la méthode avant tout',
      description: 'Organisé et méthodique, tout doit être bien planifié dans votre vie. Vous préférez soutenir plutôt que diriger. En amour, vous avez besoin de temps avant de vous abandonner. Vous êtes respectueux des valeurs familiales. Votre sens de la débrouillardise et votre puissance de travail vous assurent une stabilité financière.'
    },
    {
      number: 5,
      title: 'Vous n\'aimez pas la routine !',
      description: 'Le changement et la nouveauté vous animent. Timide en apparence, vous faites preuve d\'un sang-froid incroyable. Vous aidez souvent votre entourage à prendre du recul. En amour, vos sentiments sont intenses. Professionnellement, vous privilégiez l\'autonomie, attiré par le tourisme ou les professions libérales.'
    },
    {
      number: 6,
      title: 'Une nature romantique',
      description: 'Profondément romantique, vous nourrissez des rêves en secret. Votre charisme attire les gens prêts à vous accompagner. Vous exprimez le mieux votre sensibilité en famille. Au travail, vos qualités sont reconnues malgré votre distance. Vous oscillez entre dépenses impulsives et désir d\'épargne.'
    },
    {
      number: 7,
      title: 'Une grande capacité d\'analyse',
      description: 'Observateur et analytique, vos conseils sont précieux. Vous cherchez constamment à mieux vous connaître. En amour, vous croyez au destin mais pouvez manquer des opportunités par votre tendance à l\'isolement. Professionnellement, vous misez sur la formation continue et ne devez vos succès qu\'à vos efforts.'
    },
    {
      number: 8,
      title: 'Une vraie locomotive',
      description: 'Visionnaire et ambitieux, vous accédez à des postes élevés. Vous guidez naturellement les autres tout en restant méfiant. Impulsif, vous prenez des risques soutenus par votre force de caractère. En amour, vous menez la danse et gérez les finances. Avec le temps, votre tempérament s\'adoucit.'
    },
    {
      number: 9,
      title: 'Idéaliste et vulnérable',
      description: 'Vous rêvez d\'un monde harmonieux et êtes sensible à l\'injustice. Au travail, vous défendez vos projets avec méthode et constance. Ami fidèle, vous recueillez les confidences. En amour, malgré les blessures passées, vous croyez au grand amour et cherchez une relation authentique et sans restriction.'
    }
  ];

  getActiveTitle(index:number):string{
    return this.activeNumberData.find(data => data.number === index)?.title || '';
  }

  /**
   * Ma méthode de cacul du nombre actif
   * @param input 
   * @returns 
   */
  calculateActiveNumber(input:string) {
    input = input.toUpperCase().replace(/[^A-Z]/g, "");
  
    let sum = 0;
    for (let i = 0; i < input.length; i++) {
      let charNumber = (input.charCodeAt(i) - 64) % 9; 
  
      sum += charNumber === 0 ? 9 : charNumber;
    }
  
    while (sum >= 10) {
      sum = sum.toString().split('').map(Number).reduce((a, b) => a + b);
    }
  
    return sum;
  }

  ngOnInit(){
    this.nameInput.valueChanges.subscribe((value:string) => {
      this.personnality = this.activeNumberData.find(data => data.number === this.activeNumber) || null;
      this.nameInput.setValue((value.charAt(0).toLocaleUpperCase()+value.substring(1)).replace(/[^A-Za-z\s]/g, ""), {emitEvent: false});
    });
  }

}
