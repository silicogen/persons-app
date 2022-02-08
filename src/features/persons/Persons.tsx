import { PersonsTable } from './PersonsTable';
import { PersonsNav } from './PersonsNav';
import { PersonsFetch } from './PersonsFetch';
import { PersonsFilter } from './PersonsFilter';
import { PersonDetails } from './PersonDetails';
import { PersonAddition } from './PersonAddition';

export function Persons() {
  return <div>
    <PersonsFetch />
    <PersonsNav />
    <PersonsFilter />
    <PersonAddition />
    <PersonsTable />
    <PersonDetails />

  </div>
}
