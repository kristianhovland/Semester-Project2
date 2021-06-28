
import './App.scss';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ArticlesPage from "./pages/ArticlesPage";
import AdminPage from "./pages/AdminPage";
import AddPage from "./pages/AddPage";
import EditPage from "./pages/EditPage";
import EditListPage from "./pages/EditListPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import NavMenu from "./components/NavMenu";
import ArticleDetail from "./components/articles/ArticleDetail";



function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <NavMenu />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/articles">
              <ArticlesPage />
            </Route>
            <Route path="/page/:id">
              <ArticleDetail />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/admin" exact>
              <AdminPage />
            </Route>
            <Route path="/admin/add" exact>
              <AddPage />
            </Route>
            <Route path="/admin/edit" exact>
              <EditListPage />
            </Route>
            <Route path="/admin/edit/:id" exact>
              <EditPage />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
