# Requires git setup
git clone git@github.com:sponsorCoinAdmin/dev-contracts-SpCoin.git
cp ../../dev-contracts-SpCoin/.env .

// NOTE: This shell script must be run from this directory ./SPCoinDevSetup

export SPONSOR_COIN_ENV=$PWD
cd ..
export SPONSOR_COIN_HOME=$PWD
echo "export SPONSOR_COIN_HOME=$SPONSOR_COIN_HOME" | tee -a ~/.bashrc
cd SPCoinDevEnvSetup
echo "export SPONSOR_COIN_ENV=$SPONSOR_COIN_ENV" | tee -a ~/.bashrc

echo ". "$SPONSOR_COIN_ENV"/.e" | tee -a ~/.bashrc

set -o vi
. $SPONSOR_COIN_ENV/.e
m
cdcurr
