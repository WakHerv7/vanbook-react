//---------------------------------------------------------
export const calculateAmount = (al, lineType) => {
    let ta = 0;
    al.map(elt => {
        ta += Number(elt[lineType]['amount']);
    })
    return ta
};   
//---------------------------------------------------------

export function findObjectById(accounts, id) {
    const accountsArray = Object.values(accounts);
    for (let account of accountsArray) {
        if (account.id === id) {
            return account;
        } else if (account.children) {
            const childAccount = findObjectById(account.children, id);
            if (childAccount) {
                return childAccount;
            }
        }
    }
    return null;
}
//---------------------------------------------------------

export function reorganizeState(responseData) {
    const accountMap = responseData.reduce((map, account) => {
        map[account.id] = account;
        return map;
    }, {});
 
    const root = [];
    const accountIds = Object.keys(accountMap);
 
    accountIds.forEach(id => {
        const account = accountMap[id];
        if (account.parent_id) {
            const parent = accountMap[account.parent_id];
            if (parent) {
                if (!parent.children) {
                   parent.children = [];
                }
                parent.children.push(account);
            }
        } else {
            root.push(account);
        }
    });
 
    root.sort((a, b) => a.name.localeCompare(b.name));
    root.forEach(account => {
        if (account.children) {
            account.children.sort((a, b) => a.name.localeCompare(b.name));
        }
    });

    return root
}
//---------------------------------------------------------

export function reorganizeData(responseData) {
    const accountMap = responseData.reduce((map, account) => {
        map[account.id] = account;
        return map;
    }, {});
 
    const root = [];
    const accountIds = Object.keys(accountMap);
 
    accountIds.forEach(id => {
        const account = accountMap[id];
        if (account.parent_id) {
            const parent = accountMap[account.parent_id];
            if (parent) {
                if (!parent.children) {
                   parent.children = [];
                }
                parent.children.push(account);
                account.myparent = parent;
            }
        } else {
            root.push(account);
        }
    });
 
    root.sort((a, b) => a.name.localeCompare(b.name));
    const root2 = [...root]
    root.forEach((account, index) => {
        account.level = 0
        let tab = []
        if (account.children) {            
            account.children.sort((a, b) => a.name.localeCompare(b.name));
            account.children.forEach((child, idx) => {
                child.level = 1
                tab.push(child)
            })
        }
        root2.splice(index+1, 0, ...tab);
        delete root2[index].children
    });
    // return root2

    // Recursive function to handle multiple levels
   function processAccounts(accounts, level) {
        accounts.forEach((account, index) => {
            account.level = level;
            let tab = [];
            if (account.children) {
                account.children.sort((a, b) => a.name.localeCompare(b.name));
                account.children.forEach((child, idx) => {
                child.level = level + 1;
                tab.push(child);
                });
            }
            root2.splice(index + 1, 0, ...tab);
            delete root2[index].children;
            if (account.children) {
                processAccounts(account.children, level + 1);
            }
        });
    }

    processAccounts(root, 0);
    return root2;
}
//---------------------------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------