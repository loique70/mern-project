import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashLayourt from './components/DashLayourt';
import Layourt from './components/Layourt';
import Login from './features/auth/Login';
import Public from './components/Public';
import Welcome from './features/auth/Welcome';
import NotesList from './features/notes/NotesList';
import UsersList from './features/users/UsersList';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Layourt />}>
        <Route index element={ <Public />} />
        <Route path='login' element={ <Login />} />

        <Route path='dash' element={<DashLayourt />}>
          
            <Route index element={<Welcome />} />

            <Route path='notes'>
              <Route index element={<NotesList />} />
            </Route>

            <Route path='users'>
              <Route index element={<UsersList />} />
            </Route>

        </Route> {/*End of Dash*/}
      </Route>
    </Routes>
  );
}

export default App;
