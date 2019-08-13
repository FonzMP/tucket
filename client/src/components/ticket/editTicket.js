import React, { Component } from "react";
import TICKETCONSTANTS from "../../_constants/TicketConstants";

const t = TICKETCONSTANTS;

class EditTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: props.ticket._id,
      title: props.ticket.title,
      description: props.ticket.description
    };
  }

  handleOnChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  sendTicket = () => {
    this.props.sendEdit(this.state);
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
          <button onClick={this.sendTicket}>{t.EDIT_BUTTON}</button>
        </div>
      </div>
    );
  }
}

export default EditTicket;
