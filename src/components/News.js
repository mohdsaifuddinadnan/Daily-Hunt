import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'sports',
    }
    PropTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,

        }
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a7994acc5b14415ab5877dddeb57dad1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);

        let parseData = await data.json()

        console.log(parseData);
        this.setState({ articles: parseData.articles, totalResults: parseData.totalResults, loading: false })
    }

    PrevPage = async () => {
        console.log("prev page clicked");
        this.setState({ loading: true })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a7994acc5b14415ab5877dddeb57dad1&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json()

        this.setState({
            page: this.state.page - 1,
            articles: parseData.articles,
            loading: false

        })
    }

    NextPage = async () => {
        console.log("Next page clicked");
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            this.setState({ loading: true })
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a7994acc5b14415ab5877dddeb57dad1&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            let data = await fetch(url);
            let parseData = await data.json()
            this.setState({
                page: this.state.page + 1,
                articles: parseData.articles,
                loading: false
            })
        }
    }
    render() {
        let nullImg = "https://i.insider.com/6466f24163c86a0018ccdd43?width=1200&format=jpeg";
        return (
            <div className='container my-3'>
                <h1 className='text-center text-light' style={{ padding:"60px"}}>Toofan Express - Headlines</h1>
                {this.state.loading && <Spinner />}
                <div className='row' >
                    {!this.state.loading && this.state.articles && this.state.articles.map((element) => {
                        return <div className='col-md-4' key={element.url}>
                            <NewsItem
                                title={element.title ? element.title.slice(0, 45) : " "} description={element.description ? element.description.slice(0, 80) : " "} ImageUrl={element.urlToImage ? element.urlToImage : nullImg} newsUrl={element.url}
                            />
                        </div>
                    })}
                </div>

                <div className='container d-flex justify-content-between mt-4'>
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.PrevPage}> &larr; previous </button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.NextPage}> Next &rarr; </button>
                </div>
            </div>
        )
    }
}

export default News;