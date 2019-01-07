pipeline {
  agent any
  //常量参数，初始确定后一般不需更改
  environment {
    // 腾讯云docker仓库配置信息
    DOCKER_REPOSITORY_TX_USERNAME = credentials('DOCKER_REPOSITORY_TX_USERNAME_CRS')
    DOCKER_REPOSITORY_TX_PASSWORD = credentials('DOCKER_REPOSITORY_TX_PASSWORD_CRS')
   
    // 项目名
    DOCKER_PROJECT_NAME = 'management-frame'
  }
  options {
      //保持构建的最大个数
      buildDiscarder(logRotator(numToKeepStr: '4'))
  }
  //pipeline运行结果通知给触发者
  post{
    success{
      script {
        // 打Tag需要成功通知
        if(env.TAG_NAME) {
          emailext (
            body: """
                <p>${env.TAG_NAME}版本部署成功</p>
            """,
            to: "${env.DEPLOY_WEB_EMAIL_LIST}",
            subject: "${env.JOB_NAME}-${env.BUILD_NUMBER}-${env.TAG_NAME}版本部署成功",
            attachLog: true
          )
        }
      }
    }
    failure{
      script {
        // 所有分支出错都需要通知
        emailext (
          body: """
              <p>${env.BRANCH_NAME}分支构建失败</p>
          """,
          to: "${env.DEPLOY_WEB_EMAIL_LIST}",
          subject: "${env.JOB_NAME}-${env.BUILD_NUMBER}-${env.BRANCH_NAME}分支构建失败",
          attachLog: true
        )

        // 删除错误的构建镜像
        if (env.dockerImage) {
          sh "sudo docker rmi ${env.dockerImage}"
        }
      }
    }
    unstable{
      script {
        // 所有分支不稳定都需要通知
        emailext (
          body: """
              <p>${env.BRANCH_NAME}分支构建失败</p>
          """,
          to: "${env.DEPLOY_WEB_EMAIL_LIST}",
          subject: "${env.JOB_NAME}-${env.BUILD_NUMBER}-${env.BRANCH_NAME}分支构建失败",
          attachLog: true
        )

        // 删除错误的构建镜像
        if (env.dockerImage) {
          sh "sudo docker rmi ${env.dockerImage}"
        }
      }
    }
  }

  //pipeline的各个阶段场景
  stages {

    stage('Pre'){
      steps{
        echo "开始构建准备。。。"
        script{
          // 线上镜像名，由于镜像限制tag数/repository数导致，需要采用整除方法生成
          // 每100个tag需要重新开一个镜像库【sb腾讯的限制】
          double imageNumber = env.BUILD_NUMBER.toInteger() / 100
          def randomNumber = Math.ceil(imageNumber)

          if (env.BRANCH_NAME == 'build/dev') { 
            env.MODE = "development"
          } else if (env.BRANCH_NAME == 'build/test') {
            env.MODE = "test"
          } else {
            env.MODE = "production"
          }

          // 不同环境，部署配置信息不同
          if (env.TAG_NAME){

            // 镜像名
            env.dockerPreImage = env.DOCKER_PROJECT_NAME + '-master'
            env.dockerImage = env.dockerPreImage + ':' + env.TAG_NAME
            env.onlineImage = "${env.DOCKER_TX_URL}/${env.DOCKER_TX_NAMESPACE_CRS_FRONT}/${env.dockerPreImage}-${randomNumber}:${env.TAG_NAME}"
          } else {
            
            // 镜像名
            env.dockerPreImage = env.DOCKER_PROJECT_NAME + '-' + env.BRANCH_NAME.split("/").join("-")
            env.dockerImage = env.dockerPreImage + ':' + env.GIT_COMMIT
            env.onlineImage = "${env.DOCKER_TX_URL}/${env.DOCKER_TX_NAMESPACE_CRS_FRONT}/${env.dockerPreImage}-${randomNumber}:${env.GIT_COMMIT}"
          }
        }
        echo "构建准备结束。。。"
      }
    }

    stage('Build'){
      steps{
        echo "开始构建。。。"
        script{
          if (env.BRANCH_NAME == 'build/dev' || env.BRANCH_NAME == 'build/test' || env.TAG_NAME){
            // 代码构建
            sh '''
            #!/bin/bash
            sudo docker -v

            # build docker image
            sudo docker build --build-arg MODE=${MODE} . -t ${dockerImage}

            # tx docker login
            sudo docker login ${DOCKER_TX_URL} --username ${DOCKER_REPOSITORY_TX_USERNAME} --password ${DOCKER_REPOSITORY_TX_PASSWORD}

            # tag docker image
            sudo docker tag ${dockerImage} ${onlineImage}

            # push to tx
            sudo docker push ${onlineImage}

            # rm
            sudo docker rmi ${dockerImage}
            sudo docker rmi ${onlineImage}

            exit
            '''
          }
        }
        echo "镜像地址 - [自动发布已完成，无需手动复制即可自动生效]"
        echo "构建结束。。。"
      }
    }

    stage('Test'){
      steps{
        echo "开始测试。。。"
        echo "结束测试。。。"
      }
    }

    stage('Deploy'){
      steps{
        echo "开始部署。。。"
        script{
          env.needDeploy = "No"
          env.deployServiceId = ''
          if (env.TAG_NAME) {
            // 通知询问构建
            def jobInfo=env.JOB_NAME.split("/")
            emailext (
              body: """
              <p>请开发组长用个人账户登录Jenkins Pipeline页面，同意${env.TAG_NAME}版本部署</p>
              <p>Pipeline页面： <a href='${env.JENKINS_URL}blue/organizations/jenkins/${jobInfo[0]}/detail/${jobInfo[1]}/${env.BUILD_NUMBER}/pipeline'>${env.JOB_NAME}(pipeline page)</a></p>
              """,
              to: "${env.LEADER_WEB_USER_EMAIL}",
              subject: "${env.JOB_NAME}-${env.BUILD_NUMBER}-请开发组长同意${env.TAG_NAME}版本部署",
              attachLog: true
            )

            // 询问构建
            try {
              timeout(time: 5, unit: 'MINUTES') {
                env.Master_Confirm = input(
                  message: '是否开始部署正式环境？',
                  ok: "确定",
                  submitter: "${env.LEADER_WEB_USER}",
                  parameters: [
                    choice(choices: "Yes\nNo\n", description: '开发组长确认是否部署，不同意请选择No!', name: 'Master_Confirm')
                  ],
                )
              }
            } catch (err){
              echo err.toString()
              env.Master_Confirm='No'
            }


            // 同意部署
            if (!"${env.Master_Confirm}".contains("Yes")) {
              //如果组长不通过，退回开发继续开发部署
              emailext (
                body: """
                <p>开发组长不通过正式环境部署，请相关开发重新开发部署和自测<p>
                <p>需要重新部署在Jenkins Pipeline视图继续执行步骤 <a href='${env.JENKINS_URL}blue/organizations/jenkins/${jobInfo[0]}/detail/${jobInfo[1]}/${env.BUILD_NUMBER}/pipeline'>${env.JOB_NAME}${env.JOB_NAME} (pipeline)</a> ！！！</p>
                """,
                to: "${env.DEPLOY_WEB_EMAIL_LIST}",
                subject: "${env.JOB_NAME}-${env.BUILD_NUMBER}-开发组长不通过开发完成，请相关开发重新开发部署和自测",
                attachLog: true
              )
              echo "组长已拒绝部署！${env.Master_Confirm}"
              throw new RuntimeException()
              false
            } else {
              env.needDeploy = "Yes"
              env.deployServiceId = 'c-4s4b2:p-klg6d'
              env.k8sNamespace = 'crs-frontend';
            }

          } else if (env.BRANCH_NAME == 'build/dev') {
            env.needDeploy = "Yes"
            env.deployServiceId = 'c-4s4b2:p-klg6d'
            env.k8sNamespace = 'frontend';
          } else if (env.BRANCH_NAME == 'build/test') {
            env.needDeploy = "Yes"
            env.deployServiceId = 'c-4s4b2:p-klg6d'
            env.k8sNamespace = 'crs-test-frontend';
          } else {
            false
          }

          // 开始部署
          if ("${env.needDeploy}".contains("Yes")) {
            echo "部署服务器中。。。"
            withCredentials([kubeconfigContent(credentialsId: 'dev_test-vchangyi-com', variable: 'KUBECONFIG_CONTENT')]) {
                sh '''
                    echo "$KUBECONFIG_CONTENT" > kubeconfig
                    kubectl set image deployment/console console=${onlineImage} --namespace=${k8sNamespace} --kubeconfig=kubeconfig
                    rm kubeconfig
                '''
            }
            echo "部署服务器完成。。。"
          } else {
            false
          }
        }
        echo "部署结束。。。"
      }
    }
  }
}
