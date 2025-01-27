# FFHS-PA5

[![License](https://img.shields.io/badge/License-GPL--v3.0-lightgrey)](https://github.com/rumpli/FFHS-PA5/blob/main/LICENSE)
![Code](https://img.shields.io/badge/Language-HTML-red)
![Code](https://img.shields.io/badge/Language-Java-brown)
![Code](https://img.shields.io/badge/Language-TypeScript-blue)
![Code](https://img.shields.io/badge/Language-CSS-purple)
![Code](https://img.shields.io/badge/Language-JavaScript-yellow)
![Code](https://img.shields.io/badge/Language-Python-darkblue)
-----

Table of Contents
=================
* [What is this about?](#what-is-this-about)
* [Grades](#grades)
* [More FFHS projects](#more-ffhs-projects)

-----

### What is this about?
This project is the project work from the "Projektarbeit 5" module at the FFHS (HS24/25). The backend was written in Java with Spring Boot. The frontend was written in Typescript with React/Expo framework. Postgresql was used as database.

#### Documentation
[MyCloud](https://www.mycloud.ch/s/S009270381C5B1D50F5C996D3F5E26B176F51D44030)

#### Grades
Endgrade: 4.7
- Documentation (60%):
- - PMG: N/A
- - SWE: N/A
- - OOP: N/A
- Presentation (10%):
- - PMG: N/A
- - SWE: N/A
- - OOP: N/A
- Expert discussion (30%):
- - PMG: N/A
- - SWE: N/A
- - OOP: N/A

### More FFHS projects

FFHS directory: [MyCloud](https://www.mycloud.ch/s/S00735653476C6FF89DAE1C9D6F19C814A0FE9C6DC2)

![image](https://github.com/rumpli/FFHS-AnPy/assets/24840091/5c56fb5b-944a-40a3-b5c8-1972850dc7a2)

FFHS projects: [GitHub](https://github.com/rumpli?tab=repositories&q=FFHS&type=&language=&sort=)

## Contributors

<!-- readme: collaborators,contributors,alexblaeuer,rumpli/- -start -->
<table>
	<tbody>
		<tr>
            <td align="center">
                <a href="https://github.com/alexblaeuer">
                    <img src="https://avatars.githubusercontent.com/u/11502742?v=4" width="100;" alt="alexblaeuer"/>
                    <br />
                    <sub><b>Alex Bläuer</b></sub>
                </a>
            </td>
		</tr>
	<tbody>
</table>
<!-- readme: collaborators,contributors,alexblaeuer,rumpli/- -end -->

# Online Demo

**Play game**

https://brainquest.netcreed.ch/

**API Documentation**

https://api.brainquest.netcreed.ch/swagger-ui/index.html#/

# Development environment setup

## Requirements

- IntelliJ IDEA
- OpenJDK 23.0.1
- Gradle
- Docker
- Docker Compose
- Git

## Database

```bash
cd docker
docker compose up -d
```

### Reset Database

```bash
# stop backend
cd docker
docker compose down
# delete folder postgres in path ./data
docker compose up -d
# start backend
```

## Backend

1. Open project in IntelliJ
2. Load all Gradle projects
3. Start Backend by running/debugging `BrainQuestApplication` class
4. Create User/Change Password in Spring Shell

```bash
# create user
create-user

# change password
change-password
```

**API Documentation**

Swagger UI:

http://localhost:8080/swagger-ui/index.html#/

## Frontend

> [README Frontend](./frontend/README.md)

# Docker Compose setup

Host the application locally with Docker Compose.

**Play game**

http://localhost:5000/

**API Documentation**

http://localhost:8080/swagger-ui/index.html#/

## Requirements

- Docker
- Docker Compose

## Start Project

1. Create folder `brainquest` under desired path
2. Create file `docker-compose.yaml`

```yaml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_DB: brainquest
      POSTGRES_USER: brainquest
      POSTGRES_PASSWORD: brainquest
    restart: unless-stopped
    networks:
      - brainquest
    volumes:
      - ./data/postgres:/var/lib/postgresql/data

  backend:
    image: alexblaeuer/brainquest:1.0.0-amd64
    #image: alexblaeuer/brainquest:1.0.0-arm64
    depends_on:
      - db
    environment:
      APP_URL: http://localhost:8080
      FRONTEND_URL: http://localhost:5000
      DB_URL: db
      DB_PORT: 5432
      DB_NAME: brainquest
      DB_USERNAME: brainquest
      DB_PASSWORD: brainquest
    restart: unless-stopped
    networks:
      - brainquest
    ports:
      #- "80:8080"
      - "8080:8080"

  frontend:
    image: rumpli/brainquest-frontend:v1.0.2
    environment:
      API_URL: http://localhost:8080/api
    restart: unless-stopped
    networks:
      - brainquest
    ports:
      - "5000:5000"

networks:
  brainquest:
    driver: bridge
```
3. Start project with `docker compose up -d`


4. Create User/Change Password

```bash
# start spring shell
docker compose exec backend /bin/bash
# change port since default is already in use
java -DPORT=8081 -jar brainquest.jar

# create user
create-user

# change password
change-password
```

# Build container image

```bash
# amd64
docker build --platform linux/amd64 -t alexblaeuer/brainquest:<image_tag>-amd64 .
docker push alexblaeuer/brainquest:<image_tag>-amd64

# arm64
docker build --platform linux/arm64 -t alexblaeuer/brainquest:<image_tag>-arm64 .
docker push alexblaeuer/brainquest:<image_tag>-arm64
```
