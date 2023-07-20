# Requires git setup
export SPONSOR_COIN_DIR=dev-contracts-spcoin;
git clone git@github.com:sponsorCoinAdmin/$SPONSOR_COIN_DIR.git
cd $SPONSOR_COIN_DIR
export SPONSOR_COIN_HOME=$PWD
cd ..
export SPONSOR_COIN_ENV=$PWD/$SPONSOR_COIN_DIR

// NOTE: This shell script must be run from this directory ./SpCoinDevSetup


echo "export SPONSOR_COIN_HOME=$SPONSOR_COIN_HOME" | tee -a ~/.bashrc
cd SPCoinDevEnvSetup
echo "export SPONSOR_COIN_ENV=$SPONSOR_COIN_ENV" | tee -a ~/.bashrc

echo ". "$SPONSOR_COIN_ENV"/.e" | tee -a ~/.bashrc

cp ./.env $SPONSOR_COIN_DIR
