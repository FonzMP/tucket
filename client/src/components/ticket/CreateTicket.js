import React, { Component } from "react";
import TICKETCONSTANTS from "../../_constants/TicketConstants";

const t = TICKETCONSTANTS;

class CreateTicket extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: ""
    };
  }

  handleOnChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  sendTicket = () => {
    this.props.addTicket(this.state);
  };
  render() {
    return (
      <div className="create-ticket-container">
        <div className="form-group">
          <label htmlFor={t.TITLE}>
            Title:
            <input
              id={t.TITLE}
              type="text"
              value={this.state.title}
              onChange={this.handleOnChange}
              placeholder={t.TITLEPLACE}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor={t.DESCRIPTION}>
            Description:
            <textarea
              id={t.DESCRIPTION}
              type="text"
              rows="5"
              value={this.state.description}
              onChange={this.handleOnChange}
              placeholder={t.DESCPLACE}
            />
          </label>
        </div>
        <div className="form-group">
          <button onClick={this.sendTicket}>{t.CREATE_BUTTON}</button>
        </div>
      </div>
    );
  }
}

export default CreateTicket;
