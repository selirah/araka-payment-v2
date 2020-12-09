-- Table: public.ApplicationDomains

-- DROP TABLE public."ApplicationDomains";

CREATE TABLE public."ApplicationDomains"
(
    "ApplicationId" integer NOT NULL,
    "ApplicationAliasId" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "Domain" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "ApplicationDomains_pkey" PRIMARY KEY ("ApplicationId", "ApplicationAliasId"),
    CONSTRAINT "ApplicationDomains_Domain_key" UNIQUE ("Domain"),
    CONSTRAINT "ApplicationDomains_ApplicationId_fkey" FOREIGN KEY ("ApplicationId")
        REFERENCES public."Applications" ("ApplicationId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."ApplicationDomains"
    OWNER to pcesdevuser;