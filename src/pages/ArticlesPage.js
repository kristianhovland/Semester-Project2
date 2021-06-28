import Heading from "../components/layout/Heading";
import Subheading from "../components/layout/Subheading";
import ArticleList from "../components/articles/ArticleList";
import Search from "../components/Search";
import Footer from "../components/Footer";




export default function ArticlePage() {
    return (
        <>
            <Heading content="Articles" />
            <Subheading content="Here you can find guides and news about everything code related." />
            <div className="headerSearch">
              <Search />
            </div>
            <ArticleList />
            <Footer />
        </>
    );
}