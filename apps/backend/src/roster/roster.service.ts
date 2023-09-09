import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { IRosterssRO } from './roster.interface';

import { Roster } from './roster.entity';

@Injectable({
  providedIn: 'root',
})
export class RosterService {
  private readonly apiUrl = '/api/roster'; // Assuming you have set up a proxy, else use your full NestJS URL like 'http://localhost:3000/roster'
  constructor(
    @InjectRepository(Roster)
    private readonly rosterRepository: EntityRepository<Roster>,
  ) {}

  async findAll(): Promise<IRosterssRO> {
    const rosters = await this.rosterRepository.findAll();
    return { users: rosters.map((roster: Roster) => `${roster.tag} (ID: ${roster.id})`) };
  }
}
