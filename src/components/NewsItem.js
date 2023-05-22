import React, { Component } from 'react'
import './NewsItem.css';
export class NewsItem extends Component {

    render() {
        let { title, description, ImageUrl, newsUrl } = this.props;
        return (
            <div>
                <div className="card my-4" style={{ width: "auto" }}>
                    <img src={ImageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h6 className="card-title">{title}...</h6>
                        <p className="card-text">{description}...</p>
                        <a href={newsUrl} rel='noreferrer' target='_blank' className="btn btn-sm btn-primary">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem