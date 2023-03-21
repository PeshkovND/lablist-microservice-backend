export class JournalLab {
  num: number;
  deadline?: Date;
  name?: string;
}

export class Journal {
  _id: string;

  labs: JournalLab[];

  discription?: string;

  students: string[];
}
