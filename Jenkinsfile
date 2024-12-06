pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/raman-chakkal/dev-project'
            }
        }
        stage('Build') {
            steps {
                bat 'npm install'
            }
        }
        stage('Test') {
            steps {
                bat 'npm test'
            }
        }
        stage('Package') {
            steps {
                bat 'npm run build'
            }
        }
    }
}
