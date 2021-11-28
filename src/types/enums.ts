export enum VRF {
  none=0,
  low,
  medium,
  high,
}

export enum VSL {
  none = 0,
  lower,
  moderate,
  high,
  severe,
}

export enum ApplicableSystem {
  lowImpact = 0,
  mediumImpact,
  HighImpact,
  none,
}

export enum QuestionType {
  single = 'radio',
  yesNo = 'yes-no',
  multiple = 'checkbox',
  date = 'date',
  number = 'number',
}
