package argocd

import (
	"fmt"

	"google.golang.org/grpc"
)

type ArgoCD struct {
}

func (a *ArgoCD) Login(username, password string) error {

	// Set the ArgoCD API server address
	argoCDServer := "localhost:8080" // Replace with your ArgoCD server address

	// Create a gRPC connection to the ArgoCD server
	conn, err := grpc.Dial(argoCDServer, grpc.WithInsecure())
	if err != nil {
		fmt.Printf("Error connecting to ArgoCD server: %v\n", err)
		return err
	}
	defer conn.Close()

	// Create an ArgoCD client
	argoCDClient := argoproj.NewApiClient(conn)

	argoCDClient

	return nil
}

func (a *ArgoCD) Sync(appName string) error {

	return nil

}

func (a *ArgoCD) Wait() error {

	return nil

}

func New() *ArgoCD {

	return &ArgoCD{}
}
