import React from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

class Movie extends React.Component{

  render(){
    return(
      <Col>
        <Card style={{width:'18rem'}}>
          <Card.Title>{this.props.title}</Card.Title>
          {this.props.img_url&&<Card.Img variant="top" src={this.props.img_url}/>}
          <Card.Text>Overview: {this.props.overview}</Card.Text>
          <Card.Text>Average Votes: {this.props.average_votes}</Card.Text>
          <Card.Text>Total Votes: {this.props.total_votes}</Card.Text>
          <Card.Text>Popularity: {this.props.popularity}</Card.Text>
          <Card.Text>Released On: {this.props.released_on}</Card.Text>
        </Card>
      </Col>
    );
  }
}

export default Movie;