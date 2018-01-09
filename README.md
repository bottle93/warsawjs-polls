# warsawjs-polls

Application for submitting feedback after WarsawJS workshops.


## Usage

To start, you need:

* [docker](https://docs.docker.com/engine/installation/) - container engine
* [docker-compose](https://docs.docker.com/compose/install/) - allow starting multiple containers at once
* [direnv](https://direnv.net/) - automatically adds env variables from `.envrc`

Setup [direnv]:

* append to the end of .bashrc file (for bash shell):
eval "$(direnv hook bash)"
* reload shell

When installed, run:
```bash
$ git clone git@gitlab.com:webdevsch/prOpto.git
$ cd pr0pto
$ direnv allow
$ run-init
```

## TODOs

* [X] Create backend boilerpate 
* [X] Create frontend application boilerplate
* [X] Docker development configuration
* [X] Basic frontend to view poll questions
* [ ] Create poll submission when user clicks submit
* [ ] Add routing to display proper poll
* [ ] Display errors 
* [ ] Fix design and styling


## API

To show endpoints, start application and visit `http://localhost:8000/api`. It should be displayed in "browserable" form. 

Example of request creating response of poll:

```bash
curl -XPOST -H "Content-Type: application/json" localhost:8000/api/submissions/ \
  -d '{"poll": 2, "answers": [{"question": 3, "text": "test"}, {"question": 2, "score": 5}]}'
```
