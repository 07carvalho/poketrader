import React from 'react';
import {
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
} from 'reactstrap';
import API from '../../api/API';


class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      myPokemon: '',
      theirPokemon: '',
      my: [],
      their: []
    }
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Create a new post and insert in the top of list.
   *
   * @public
   */
  getPokemon = event => {
    const key = event.target.getAttribute('data-type');
    API.getPokemon(this.state[key + 'Pokemon'])
    .then((response) => {
      this.setState({
        [key + 'Pokemon']: '',
        [key]: [...this.state[key], response.data]
      })
    });
  }

  onFormSubmit = event => {
    event.preventDefault();
    this.getPokemon(event);
  }

  handleChange = event => {
    const key = event.target.getAttribute('data-type');
    this.setState({[key + 'Pokemon']: event.target.value});
  }

  removePokemonFromList = (index, type) => {
    let pokeList = this.state[type];
    pokeList.splice(index, 1);
    this.setState({
      [type]: pokeList
    });
  }

  showPokemonList = (type) => {
    return this.state[type].map((pokemon, index) => {
      return (
        <Col xs="4" key={index}>
          <Card className="poke-card mb-4">
            <Button className="remove-btn" color="danger"
                    size="sm" type="button"
                    onClick={() => this.removePokemonFromList(index, type)}>
              Remove
            </Button>
            <CardImg
              alt="{pokemon.name}"
              src={pokemon.image}
              top
            />
            <CardBody className="pt-2 pb-2">
              <CardTitle className="mb-0">
                <h5 className="text-truncate mb-0 text-center">{pokemon.name}</h5></CardTitle>
            </CardBody>
          </Card>
        </Col>
      )
    })
  }

  render() {
    return (
      <main ref="main">
        <section className="section section-lg pt-lg-0">
          <Row className="mr-3 ml-3">
            <Col className="mr-5">
              <div>
                <h3>My Pokemon</h3>
                <Form data-type="my" onSubmit={this.onFormSubmit}>
                  <Row>
                    <Col xs="12" sm="8">
                      <FormGroup>
                        <Input
                          id="my-pokemon-input"
                          placeholder="Search a Pokemon by name"
                          className="form-control-alternative"
                          type="text"
                          value={this.state.myPokemon}
                          data-type="my"
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <Button block color="primary" type="button"
                              data-type="my"
                              onClick={this.getPokemon}>
                        Search
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
              {this.state.my.length > 0 &&
                <div className="mt-4">
                  <h5>Selected Pokemon</h5>
                  <Row>{this.showPokemonList('my')}</Row>
                </div>
              }
              {this.state.my.length === 0 &&
                <div className="message-wrapper">
                  <h4>No Pokemon selected!</h4>
                </div>
              }
            </Col>
            <Col className="ml-5">
              <div>
                <h3>Their Pokemon</h3>
                <Form data-type="their" onSubmit={this.onFormSubmit}>
                  <Row>
                    <Col xs="12" sm="8">
                      <FormGroup>
                        <Input
                          id="their-pokemon-input"
                          placeholder="Search a Pokemon by name"
                          className="form-control-alternative"
                          type="text"
                          value={this.state.theirPokemon}
                          data-type="their"
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <Button block color="primary" type="button"
                              data-type="their"
                              onClick={this.getPokemon}>
                        Search
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
              {this.state.their.length > 0 &&
                <div className="mt-4">
                  <h5>Selected Pokemon</h5>
                  <Row>{this.showPokemonList('their')}</Row>
                </div>
              }
              {this.state.their.length === 0 &&
                <div className="message-wrapper">
                  <h4>No Pokemon selected!</h4>
                </div>
              }
            </Col>
          </Row>
        </section>
      </main>
    );
  }
}

export default Home;