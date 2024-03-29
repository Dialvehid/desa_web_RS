CREATE TABLE IF NOT EXISTS USRS(
  idusr    INT SERIAL DEFAULT VALUE,
  nombre    VARCHAR(255) NOT NULL ,
  apodo     VARCHAR(100) DEFAULT NULL,
  fechanac  DATE DEFAULT NULL,
  correo    VARCHAR(100) NOT NULL,
  imgperf   TEXT DEFAULT NULL,
  pass      VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS POST(
  idpst     INT SERIAL DEFAULT VALUE,
  idusr     INT NOT NULL ,
  texto     VARCHAR(255) DEFAULT NULL,
  fecha     DATE NOT NULL,
  img       TEXT DEFAULT NULL,
  CONSTRAINT pk_post_users FOREIGN KEY (idusr) REFERENCES USRS(idusr)
);

CREATE TABLE IF NOT EXISTS REACT_POST(
  idpst     INT NOT NULL,
  idusr     INT NOT NULL,
  CONSTRAINT pk_post FOREIGN KEY (idpst) REFERENCES POST(idpst),
  CONSTRAINT pk_users FOREIGN KEY (idusr) REFERENCES USRS(idusr)
);