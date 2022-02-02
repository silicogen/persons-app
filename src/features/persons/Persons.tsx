import { PersonsTable } from './PersonsTable';
import { PersonsNav } from './PersonsNav';
import { PersonsFetch } from './PersonsFetch';
import { PersonsFilter } from './PersonsFilter';

export function Persons() {
  return <div>
    <PersonsFetch />
    <PersonsNav />
    <PersonsFilter />
    <PersonsTable />
  </div>
}
