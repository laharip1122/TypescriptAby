# typescript-work-pappers-example


# Build Project
npm install && yarn build

# Run Test Suites
protractor dist/protractor.conf.js --suite=E2E

# Number of workers
protractor dist/protractor.conf.js --capabilities.shardTestFiles=true  --capabilities.count=1 --capabilities.maxInstances=1 --suite=E2E