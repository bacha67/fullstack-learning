CREATE TABLE "cars" (
	"id" serial PRIMARY KEY NOT NULL,
	"make" varchar,
	"model" varchar,
	"year" integer,
	"price" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
