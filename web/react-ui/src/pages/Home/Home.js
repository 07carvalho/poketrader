import React from 'react';
import {
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  Form,
  FormGroup,
  Input,
  Modal,
  Row
} from 'reactstrap';
import API from '../../api/API';


class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      myPokemon: '',
      loadingMyPokemon: false,
      theirPokemon: '',
      loadingTheirPokemon: false,
      my: [],
      their: [],
      errorModal: false,
      evaluationModal: false,
      result: {
        good_trade: '',
        my_total_base_experience: '',
        their_total_base_experience: ''
      }
    }
    this.handleChange = this.handleChange.bind(this);
  }

  getPokemon = event => {
    const key = event.target.getAttribute('data-type');
    const pokemon = this.state[key + 'Pokemon'];
    const loading = key === 'my' ? 'loadingMyPokemon' : 'loadingTheirPokemon';
    this.setState({
      [key + 'Pokemon']: '',
      [loading]: !this.state[loading]
    })
    API.getPokemon(pokemon)
    .then((response) => {
      if (response && response.status === 200) {
        this.setState({
          [loading]: !this.state[loading],
          [key]: [...this.state[key], response.data]
        })
      } else {
        this.setState({
          errorModal: !this.state.errorModal,
          [loading]: !this.state[loading],
        });
      }
    })
    .catch((error) => {
    });
  }

  formatPokemonData = key => {
    return this.state[key].map(item => {
      return {name: item.name}
    })
  }

  postEvaluation = () => {
    if (this.checkQty) {
      const data = {
        my: this.formatPokemonData('my'),
        their: this.formatPokemonData('their')
      }
      API.postEvaluation(data)
        .then((response) => {
          this.setState({
            result: response.data
          })
          this.toggleModal('evaluationModal');
      });
    }
  }

  toggleModal = type => {
    this.setState({
      [type]: !this.state[type]
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

  resetEvaluation = () => {
    this.setState({
      myPokemon: '',
      theirPokemon: '',
      my: [],
      their: [],
      evaluationModal: false
    })
  }

  checkQty = () => {
    const myLength = this.state.my.length;
    const theirLength = this.state.their.length;
    return myLength >= 1 && myLength <= 6 && theirLength >= 1 && theirLength <= 6;
  }

  disableEvaluationBtn = () => {
    return !this.checkQty();
  }

  render() {
    return (
      <main className="mb-5">
        <section className="section section-lg pt-lg-0">
          <Row className="mr-3 ml-3">
            <Col className="mb-5">
              <div>
                <h3>
                  <img className="pokeball-icon responsive-img" src={require('../../assets/img/theme/pokeball-red.png')}/> My Pokemon</h3>
                <Form data-type="my" onSubmit={this.onFormSubmit}>
                  <Row>
                    <Col xs="12" md="8">
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
                        disabled={this.state.myPokemon.length === 0}
                        data-type="my" onClick={this.getPokemon}>
                        {this.state.loadingMyPokemon ? 'Loading...' : 'Search'}
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
            <Col className="mb-5">
              <div>
                <h3>
                  <img className="pokeball-icon responsive-img" src={require('../../assets/img/theme/pokeball-blue.png')}/> Their Pokemon</h3>
                <Form data-type="their" onSubmit={this.onFormSubmit}>
                  <Row>
                    <Col xs="12" md="8">
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
                        disabled={this.state.theirPokemon.length === 0}
                        onClick={this.getPokemon}>
                        {this.state.loadingTheirPokemon ? 'Loading...' : 'Search'}
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
        <div className="evaluation-footer">
          <Row className="float-right">
            <Col className="mr-3">
              <Button className="btn-icon btn-3" color="primary"
                disabled={this.disableEvaluationBtn()}
                size="lg" type="button" onClick={() => this.postEvaluation()}>
                <span className="btn-inner--icon">
                  <i className="ni ni-chart-bar-32" />
                </span>
                <span className="btn-inner--text">Evaluate Trade</span>
              </Button>
            </Col>
          </Row>
        </div>
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.errorModal}
          toggle={() => this.toggleModal('errorModal')}>
          <div className="modal-header">
            <h5 className="modal-title" id="modal-label">Ops!</h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal('errorModal')}>
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <p className="mb-0">We didn't find this Pokemon!</p>
            <p className="mb-0">Please check if is misspelled and try again.</p>
          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              outline
              onClick={() => this.toggleModal('errorModal')}>
              Back
            </Button>
          </div>
        </Modal>
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.evaluationModal}
          toggle={() => this.toggleModal('evaluationModal')}>
          <div className="modal-header">
            <h5 className="modal-title" id="modal-label">Evaluation Result</h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal('evaluationModal')}>
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <Row>
              <Col className="valign-wrapper" sm="6">
                <div className="pl-5 pr-5">
                  <img className="responsive-img" src={require('../../assets/img/theme/trade.png')} />
                </div>
              </Col>
              <Col sm="6">
                {this.state.result.good_trade &&
                <p>Nice work! This is a good trade!</p>
                }
                {!this.state.result.good_trade &&
                <p>Oh no! This is not a good trade!</p>
                }
                {this.state.result && <div>
                  <p className="mb-0 font-weight-700">Base Experience Sums</p>
                  <p className="mb-0">My Pokemon: {this.state.result.my_total_base_experience}</p>
                  <p className="mb-0">Their Pokemon: {this.state.result.their_total_base_experience}</p>
                </div>}
              </Col>
            </Row>
          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              outline
              onClick={() => this.toggleModal('evaluationModal')}>
              Back
            </Button>
            <Button color="primary" type="button"
              onClick={() => this.resetEvaluation()}>
              Evaluate New
            </Button>
          </div>
        </Modal>
      </main>
    );
  }
}

export default Home;