pipeline {
    agent any

    stages{
        stage('clonar o repositorio'){
            steps{
                git branch: 'main' , url: 'https://github.com/Noobdub55/teste-api-ebac.git'
            }
        }
        stage('instalar dependencias'){
            steps{
                sh 'npm install'
            }
        }
        stage('executa testes'){
            steps{
                sh 'NO_COLOR=1 npm run cy:run'
            }
        }
    }
}