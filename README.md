<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="">
    <img src="https://user-images.githubusercontent.com/65692508/115466796-68a29400-a1e5-11eb-8ceb-4d0e04d2450e.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Ahoy!</h3>

  <p align="center">
    An easy-to-use GUI for Kubernetes Helm
    <br />
    <a href="https://github.com/oslabs-beta/Ahoy"><strong>Explore the docs »</strong></a>
    <br />
    <a href="https://github.com/oslabs-beta/Ahoy">View Demo</a>
    ·
    <a href="https://github.com/oslabs-beta/Ahoy/issues">Report Bug</a>
    ·
    <a href="https://github.com/oslabs-beta/Ahoy/issues">Request Feature</a>
  </p>
</p>


<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Here's a blank template to get started:
**To avoid retyping too much info. Do a search and replace with your text editor for the following:**
`github_username`, `repo_name`, `twitter_handle`, `email`, `project_title`, `project_description`


### Built With

* [aaa](link)
* [bbb](link)
* [ccc](link)



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.
In order to Ahoy to be running on your local machine, have Dockers, Kubernetes, Helm setup and runnning.


## Prerequisites

### Installing Dockers
Install Docker desktop following the instruction below.

https://docs.docker.com/engine/install/


### Installing Kubernetes
### Installing Helm
### Setup Test Environment

Install Minikube
  ```sh
  brew install minikube
  ```
Start Minikube
  ```sh
  minikube start
  ```
Attache the node port to minikube node
  ```sh
  kubectl create deployment my-minikube --image=k8s.gcr.io/echoserver:1.4
  kubectl expose deployment my-minikube --type=LoadBalancer --port=8080
  ```
Store the Helm Charts under /user/Library/Application Support/ahoy/charts
  https://drive.google.com/file/d/1W3EGr3QSlkgQ_SLinfROzFdrh6jhRwg-/view?usp=sharing

Helm install with the chart WordPress4
  ```sh
  helm install <your-service-name>  <helm-chart-dir-name>
  ```
  ```sh
Kubectl get svc => confirm it’s installed
  ```
  ```sh
  minikube tunnel 
  ```
Minikube dashboard => check if it’s there or not
To test history…do a couple of times 

  ```sh
  helm upgrade <your-service-name>  <helm-chart-dir-name>
  ```
To check it made a history
  ```sh
  helm history <your-service-name> 
  ```
To rollback
  ```sh
  helm rollback  <your-service-name> <revision-num>
  ```



Mac terminal: 
  ```sh
  curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3
  chmod 700 get_helm.sh
  ./get_helm.sh
  ```
  ```sh
helm version
  ```
version.BuildInfo{Version:"v3.5.4", GitCommit:"1b5edb69df3d3a08df77c9902dc17af864ff05d1", GitTreeState:"clean", GoVersion:"go1.15.11"}





## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/oslabs-beta/Ahoy.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_



<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/oslabs-beta/Ahoy/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Joe Bigelow - [LinkedIn](https://www.linkedin.com/in/joe-bigelow-591a2170/) - [GitHub](https://github.com/lilbigs2001)

Tobey Forsman - [LinkedIn](https://www.linkedin.com/in/tobeyforsman/) - [GitHub](https://github.com/yebot)

Yoko Kawamoto - [LinkedIn](https://www.linkedin.com/in/yoko-kawamoto-95623047/) - [GitHub](https://github.com/libero-yoko)

Jin Oh - [LinkedIn](https://www.linkedin.com/in/jintoh613/) - [GitHub](https://github.com/ohjintech)

Project Link: [https://github.com/oslabs-beta/Ahoy](https://github.com/oslabs-beta/Ahoy)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* []()
* []()
* []()
