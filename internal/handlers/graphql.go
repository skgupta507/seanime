package handlers

import (
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gofiber/fiber/v2"
	"github.com/seanime-app/seanime/internal/graphql/graph"
	"github.com/seanime-app/seanime/internal/graphql/graph/model"
	"github.com/valyala/fasthttp/fasthttpadaptor"
	"net/http"
)

var TodoList []*model.Todo

var gqlServer = handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{
	Resolvers: &graph.Resolver{
		TodoList: TodoList,
	}}))

func HandleGraphqlServer(c *fiber.Ctx) error {

	fasthttpadaptor.NewFastHTTPHandlerFunc(func(writer http.ResponseWriter, request *http.Request) {

		gqlServer.ServeHTTP(writer, request)

	})(c.Context())

	return nil
}

func HandleGraphqlServerPlayground(c *fiber.Ctx) error {
	h := playground.Handler("GraphQL playground", "/graphql")

	fasthttpadaptor.NewFastHTTPHandlerFunc(func(writer http.ResponseWriter, request *http.Request) {

		h.ServeHTTP(writer, request)

	})(c.Context())

	return nil
}
