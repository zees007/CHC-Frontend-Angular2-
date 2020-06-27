import {File} from './file.model';

export class Achievement {

  constructor(
    public achievementYearHeading: string,
    public achievementScores: string,
    public achievementImage: File) {
  }
}
