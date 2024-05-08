 pipeline {
    agent any

    environment {
        BOOTSTRAP_ANSIBLE_PLAYBOOK = '/home/said/artifact/all_playbook.yaml'
        DATABASE_ANSIBLE_PLAYBOOK = '/home/said/artifact/database_playbook.yaml'
        DEPLOY_ANSIBLE_PLAYBOOK = '/home/said/artifact/deploy_playbook.yaml'
        CONFIGURE_NGINX_ANSIBLE_PLAYBOOK = '/home/said/artifact/configure_nginx_playbook.yaml'
        ANSIBLE_INVENTORY = '/home/said/artifact/inventory'
        PRIVATE_KEY = '/var/lib/jenkins/.ssh/id_rsa'
    }

    stages {
      stage ('Checkout code'){
        steps {
          git(url: 'https://github.com/Said-Ait-Driss/inventory-server', branch: 'main')
          sh "pwd"
        }
      }
      stage ('installing dependencies'){
          when {
              changeRequest target: 'main'
          }
          steps {
            echo '📦️ installing deps ...'
          }
      }

      stage ('Ping all hosts') {
            steps {
                script {
                    
                    sh 'ansible all -i /home/said/artifact/inventory -m ping'
                }
            }
      }
      stage ('Run Bootstrap Ansible Playbook') {
            steps {
                script {
                    echo 'boostrap playbook is done ...'
                    // sh "ansible-playbook -i ${env.ANSIBLE_INVENTORY} --user=jenkins --private-key=${env.PRIVATE_KEY} ${env.BOOTSTRAP_ANSIBLE_PLAYBOOK} --verbose"
                }
            }
        }

      stage ('Run Database Ansible Playbook') {
            steps {
                script {
                    echo 'database playbook is done'
                    // sh "ansible-playbook -i ${env.ANSIBLE_INVENTORY} --user=jenkins --private-key=${env.PRIVATE_KEY} ${env.DATABASE_ANSIBLE_PLAYBOOK} --verbose"
                }
            }

        }
      stage ('deploy code to servers') {
        steps {
            script {
                // echo 'deploy app is done'
                sh "ansible-playbook -i ${env.ANSIBLE_INVENTORY} --user=jenkins --private-key=${env.PRIVATE_KEY} ${env.DEPLOY_ANSIBLE_PLAYBOOK} --verbose"
            }
        }
      }

      stage ('configure nginx') {
        steps {
            script {
                sh "ansible-playbook -i ${env.ANSIBLE_INVENTORY} --user=jenkins --private-key=${env.PRIVATE_KEY} ${env.CONFIGURE_NGINX_ANSIBLE_PLAYBOOK} --verbose"
            }
        }
      }
    }
    post {
        // always {
        //     sh 'echo cleanup after everything'
        //     discordSend description: "Jenkins Pipeline Build", footer: "continuous-integration/jenkins/branch "+ currentBuild.currentResult , link: env.BUILD_URL, result: currentBuild.currentResult, title: JOB_NAME, webhookURL: "https://discord.com/api/webhooks/1103353416559906848/IbyFtbfvn2NDFyCnMPFaQ1r7L16UhRT_f5SscsnrdGkFCwFFQ9jSmPtjzqM-YdxacilO"
        // }

        failure {
            sh 'echo only on failure' 
        }

        success {
            sh 'echo only on success' 
        }

        changed {
            sh 'echo only on if status changed from success to failure or vice a versa' 
        }

        unstable {
            sh 'echo only on unstable' 
        }
    }
  }
  