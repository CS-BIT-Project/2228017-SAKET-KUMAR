# app.py
from flask import Flask, render_template, request, redirect, url_for, flash, session
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
import os
import secrets
from datetime import datetime, timedelta
from flask_mail import Mail, Message

app = Flask(__name__)
app.secret_key = os.urandom(24)

# MongoDB Configuration
client = MongoClient('mongodb://localhost:27017/')
db = client['user_auth']
users_collection = db['users']

# Email Configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'saketbranwal@gmail.com'  # Your SMTP email
app.config['MAIL_PASSWORD'] = 'rmwg yvnc pvnr rxqp'     # Your app password
mail = Mail(app)

@app.route('/')
def index():
    if 'username' in session:
        return f'Welcome back, {session["username"]}! <a href="/logout">Logout</a>'
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        user = users_collection.find_one({'username': username})
        if user and check_password_hash(user['password'], password):
            session['username'] = username
            flash('Login successful!', 'success')
            return redirect(url_for(''))
        else:
            flash('Invalid credentials!', 'error')
    return render_template('login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        
        if not email or '@' not in email:
            flash('Please enter a valid email address!', 'error')
        elif users_collection.find_one({'username': username}):
            flash('Username already exists!', 'error')
        elif users_collection.find_one({'email': email}):
            flash('Email already exists!', 'error')
        else:
            hashed_password = generate_password_hash(password)
            users_collection.insert_one({
                'username': username,
                'email': email,
                'password': hashed_password
            })
            flash('Registration successful! Please log in.', 'success')
            return redirect(url_for('login'))
    return render_template('signup.html')

@app.route('/forgot_password', methods=['GET', 'POST'])
def forgot_password():
    if request.method == 'POST':
        email = request.form.get('email', '').strip()
        
        # Validate email
        if not email or '@' not in email:
            flash('Please enter a valid email address!', 'error')
            return redirect(url_for('forgot_password'))
            
        user = users_collection.find_one({'email': email})
        
        if user:
            reset_token = secrets.token_urlsafe(32)
            expiry = datetime.now() + timedelta(hours=1)
            
            users_collection.update_one(
                {'email': email},
                {'$set': {
                    'reset_token': reset_token,
                    'reset_token_expiry': expiry
                }}
            )
            
            reset_url = url_for('reset_password', token=reset_token, _external=True)
            msg = Message(
                'Password Reset Request',
                sender=('Password Reset', 'saketbranwal@gmail.com'),
                recipients=[email],  # Email goes only to the user's entered email
            )
            msg.body = f'''Dear User,

We received a password reset request for your account ({email}).

To reset your password, click the following link:
{reset_url}

This link will expire in 1 hour. If you didn't request this, please ignore this email.

Best regards,
Your Application Team'''
            try:
                mail.send(msg)
                flash('A password reset link has been sent to your email.', 'success')
            except Exception as e:
                flash(f'Failed to send reset email. Please try again later. Error: {str(e)}', 'error')
        else:
            flash('No account found with that email.', 'error')
            
        return redirect(url_for('login'))
    return render_template('forgot_password.html')

@app.route('/reset_password/<token>', methods=['GET', 'POST'])
def reset_password(token):
    if request.method == 'POST':
        password = request.form['password']
        user = users_collection.find_one({
            'reset_token': token,
            'reset_token_expiry': {'$gt': datetime.now()}
        })
        
        if user:
            if not password or len(password) < 6:
                flash('Password must be at least 6 characters long!', 'error')
                return render_template('reset_password.html', token=token)
                
            hashed_password = generate_password_hash(password)
            users_collection.update_one(
                {'reset_token': token},
                {'$set': {'password': hashed_password},
                 '$unset': {'reset_token': '', 'reset_token_expiry': ''}}
            )
            flash('Password reset successful! Please log in.', 'success')
            return redirect(url_for('login'))
        else:
            flash('Invalid or expired reset link.', 'error')
            return redirect(url_for('forgot_password'))
            
    return render_template('reset_password.html', token=token)

@app.route('/logout')
def logout():
    session.pop('username', None)
    flash('Logged out successfully!', 'success')
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)