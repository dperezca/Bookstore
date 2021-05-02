INSERT INTO rol ( rolDesc ) VALUES
( "Adm" ), ( "User" ), ( "Seller" );

INSERT INTO idiomas ( cod, idiomaDesc ) VALUES
( "EN", "Ingles" ), 
( "ES", "Español" ), 
( "OT", "Otro" );

INSERT INTO categorias ( categoryDesc ) VALUES
( "Literatura" ), ( "No Ficción" ), ( "Infantil" );

INSERT INTO estados ( estadoDesc ) VALUES
( "Nuevo" ), ( "Usado" );

CREATE TABLE estados (
    estadoId int AUTO_INCREMENT,
    estadoDesc varchar(255),
    PRIMARY KEY (estadoId)
);

