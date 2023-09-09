import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Roster {
  @PrimaryKey({ type: 'number' })
  id: number;

  @Property()
  tag: string;
}
