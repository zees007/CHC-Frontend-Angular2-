
import {File} from '../models/file.model';


export class Faculty {

  constructor(
    public facultyName: string,
    public facultyEducation: string,
    public facultySubject: string,
    public facultyImage: File) {
  }
}
