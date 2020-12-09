-- Table: public.Applications

-- DROP TABLE public."Applications";

CREATE TABLE public."Applications"
(
    "ApplicationId" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "Name" character varying(30) COLLATE pg_catalog."default" NOT NULL,
    "Description" character varying(400) COLLATE pg_catalog."default",
    "IsEnabled" boolean NOT NULL,
    "DefaultCultureId" integer,
    CONSTRAINT "Applications_pkey" PRIMARY KEY ("ApplicationId"),
    CONSTRAINT "Appname" UNIQUE ("Name"),
    CONSTRAINT "Applications_DefaultCultureId_fkey" FOREIGN KEY ("DefaultCultureId")
        REFERENCES public."Cultures" ("CultureId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."Applications"
    OWNER to pcesdevuser;