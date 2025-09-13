const renderWithSessionMessages = (view) => (req, res) => {
  const { messages } = req.session;
  if(messages) {
    req.session.messages = [];
    return res.render(view, { messages });
  }
  res.render(view);
};

export default renderWithSessionMessages;