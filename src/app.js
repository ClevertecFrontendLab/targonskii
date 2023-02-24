import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components/layout/layout';
import { BookPage } from './pages/book';
import { MainPage } from './pages/main';
import { Rules } from './pages/rules/rules';
import { Terms } from './pages/terms/terms';

export const App = () => (
    <Routes>
        <Route path='/' element={<Layout />} >
            <Route index={true} element={<Navigate to='/books/all' />} />
            <Route path='/books/:genre' element={<MainPage />} />
            <Route path='/books/:genre/:id' element={<BookPage />} />
            <Route path='/rules' element={<Rules />} />
            <Route path='/terms' element={<Terms />} />
        </Route>
    </Routes>
);