from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, template_folder='templates')

# Configure the database connection URI
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://username:password@localhost/databasename'

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Define your Message model
class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sender_name = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)

@app.route('/')
def index():
    return render_template('tos.html')

@app.route('/send-message', methods=['POST'])
def send_message():
    data = request.json
    sender_name = data.get('senderName')
    message_text = data.get('message')

    # Create a new message object
    new_message = Message(sender_name=sender_name, message=message_text)

    # Add the new message to the database
    db.session.add(new_message)
    db.session.commit()

    # Send a response
    response = {'status': 'success', 'message': 'Message received'}
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)