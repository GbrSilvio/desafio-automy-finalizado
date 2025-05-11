FROM ubuntu:latest

# Expondo a porta 3000
EXPOSE 3000

# Entry point padrão
ENTRYPOINT ["top", "-b"]
