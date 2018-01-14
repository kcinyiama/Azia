
export class JournalModel {

  constructor
  (
    public id: string,

    public title: string,

    public content: string,

    public preamble: string,

    public createdAt: Date,

    public updatedAt: Date,

    public tags: string[],

    public labelId: string
  )
  {}

}
