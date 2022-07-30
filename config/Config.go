package config

import (
	"gopkg.in/yaml.v3"
	"io/ioutil"
	"log"
)

var Data = config{}

type config struct {
	DbName    string `yaml:"db_name"`
	JwtSecret string `yaml:"jwt_secret"`
}

func (c *config) Init() *config {
	yamlFile, err := ioutil.ReadFile("config.yaml")
	if err != nil {
		log.Fatal("cannot file config file", err.Error())
	}
	err = yaml.Unmarshal(yamlFile, c)
	if err != nil {
		log.Fatal("cannot parse config file", err.Error())
	}
	return c
}
