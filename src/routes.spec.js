import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import Cartoes from './componentes/Cartoes';
import App from './paginas/Principal/App';
import AppRoutes from './routes';
describe('Rotas', () => {
  test('Deve renderizar a rota principal', () => {
    render(<App />, { wrapper: BrowserRouter });

    const usuario = screen.getByText('Olá, Joana :)!');

    expect(usuario).toBeInTheDocument();
  });

  test('Deve renderizar a rota cartões', () => {
    const rota = '/cartoes';
    render(
      <MemoryRouter initialEntries={[rota]}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="cartoes" element={<Cartoes />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const meusCartoes = screen.getByText('Meus cartões');

    expect(meusCartoes).toHaveTextContent('Meus cartões');
  });

  test('Deve renderizar a localização da rota atual', () => {
    const rota = '/cartoes';
    render(
      <MemoryRouter initialEntries={[rota]}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="cartoes" element={<Cartoes />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const rotaAtual = screen.getByTestId('local');

    expect(rotaAtual).toHaveTextContent(rota);
  });

  test('Deve renderizar a página 404', () => {
    const rota404 = '/extrato';

    render(
      <MemoryRouter initialEntries={[rota404]}>
        <AppRoutes />
      </MemoryRouter>
    );

    const pagina404 = screen.getByTestId('pagina-404');

    expect(pagina404).toContainHTML('<h1>Ops! Não encontramos a página</h1>');
  });
});
