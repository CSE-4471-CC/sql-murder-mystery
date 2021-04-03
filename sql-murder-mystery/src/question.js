import React from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Row from 'react-bootstrap/Row';
import Popover from 'react-bootstrap/Popover';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.css';




class Question extends React.Component {
  constructor (props) {
    super(props);
	}
	

  render(){
    return(
      <Container fluid="md">
				<Row className="justify-content-md-center">
					<p>
						<b>Question</b><br></br>
						{this.props.question}
					</p>
				</Row>
				<Row className="justify-content-md-center">
					<CardGroup>
						<Card style={{ width: '18rem' }} bg="light">
						<OverlayTrigger
      				trigger="click"
      				key='top'
      				placement='top'
      				overlay={
        				<Popover id='popover-positioned-top'>
          				<Popover.Title as="h3">{this.props.header['A']}</Popover.Title>
          				<Popover.Content>
            				{this.props.responses['A']}
          				</Popover.Content>
        				</Popover>
      				}>
							<Button className="question-button" variant="outline-primary" size="sm" value='A'> A </Button>
						</OverlayTrigger>
							{this.props.answers[0]}
						</Card>
						<Card style={{ width: '18rem' }} bg="light">
							<OverlayTrigger
								trigger="click"
								key='top'
								placement='top'
								overlay={
									<Popover id='popover-positioned-top'>
										<Popover.Title as="h3">{this.props.header['B']}</Popover.Title>
										<Popover.Content>
											{this.props.responses['B']}
										</Popover.Content>
									</Popover>
								}>
								<Button className="question-button" variant="outline-primary" size="sm" value='B'> B </Button>
							</OverlayTrigger>
							{this.props.answers[1]}
						</Card>
					</CardGroup>
				</Row>
				<Row className="justify-content-md-center">
					<CardGroup>
						<Card style={{ width: '18rem' }} bg="light">
							<OverlayTrigger
								trigger="click"
								key='bottom'
								placement='bottom'
								overlay={
									<Popover id='popover-positioned-bottom'>
										<Popover.Title as="h3">{this.props.header['C']}</Popover.Title>
										<Popover.Content>
											{this.props.responses['C']}
										</Popover.Content>
									</Popover>
								}>
								<Button className="question-button" variant="outline-primary" size="sm" value='C'> C </Button>
							</OverlayTrigger>
							{this.props.answers[2]}
						</Card>
						<Card style={{ width: '18rem' }} bg="light">
							<OverlayTrigger
								trigger="click"
								key='bottom'
								placement='bottom'
								overlay={
									<Popover id='popover-positioned-top'>
										<Popover.Title as="h3">{this.props.header['D']}</Popover.Title>
										<Popover.Content>
											{this.props.responses['D']}
										</Popover.Content>
									</Popover>
								}>
								<Button  className="question-button" variant="outline-primary" size="sm" value='D'  > D </Button>
							</OverlayTrigger>
							{this.props.answers[3]}
						</Card>
					</CardGroup>
				</Row>
      </Container>
    );
  }
}

export default Question;