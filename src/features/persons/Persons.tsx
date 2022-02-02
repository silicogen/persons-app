import { PersonsTable } from './PersonsTable';
import { PersonsNav } from './PersonsNav';
import { PersonsFetch } from './PersonsFetch';

export function Persons() {
  return <div>
    <PersonsFetch />
    <PersonsNav />
    <PersonsTable />
  </div>
}
